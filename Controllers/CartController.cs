namespace proba1.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using proba1.Data;
using proba1.DTOs;
using proba1.Models;

[Route("api/[controller]")]
[ApiController]
    public class CartController: ControllerBase
    {
    private readonly AppDbContext _context;
    public CartController(AppDbContext context)
    {
        _context = context;
    }
    //GET: api/cart
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CartItemDto>>> GetCartItems()
    {
        var result = await _context.CartItems
            .Include(ci => ci.Customer)
            .Include (ci => ci.Product)
            .Select(ci => new CartItemDto
            {
                CartItemId = ci.Id,
                CustomerName = ci.Customer.Name, 
                ProductName = ci.Product.Name,
                Price = ci.Product.Price,
                Quantity = ci.Quantity,
            })
            .ToListAsync();
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult> AddItemToCart([FromBody] CreateCartItemDto createCartItemDto)
    {
        // For simplicity, we'll hardcode the customer ID.
        // In a real app, you'd get this from the authenticated user's session or token.
        const int customerId = 1;

        var product = await _context.Products.FindAsync(createCartItemDto.ProductId);
        if (product == null)
        {
            return NotFound("Product not found.");
        }

        var cartItem = await _context.CartItems
            .SingleOrDefaultAsync(ci => ci.CustomerId == customerId && ci.ProductId == createCartItemDto.ProductId);

        if (cartItem == null)
        {
            // Item is not in the cart, so create a new one
            cartItem = new CartItem
            {
                CustomerId = customerId,
                ProductId = createCartItemDto.ProductId,
                Quantity = createCartItemDto.Quantity
            };
            _context.CartItems.Add(cartItem);
        }
        else
        {
            // Item is already in the cart, so update the quantity
            cartItem.Quantity += createCartItemDto.Quantity;
        }

        await _context.SaveChangesAsync();

        return NoContent();
    }
}

