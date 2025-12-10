using System.ComponentModel.DataAnnotations;

namespace Dtio.Dtos;

/// <summary>
/// DTO for returning a cart item to the client (for GET operations).
/// </summary>
public class CartItemDto
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}

/// <summary>
/// DTO for creating a new cart item (for POST operation).
/// </summary>
public class CreateCartItemDto
{
    [Required]
    public int ProductId { get; set; }

    [Required]
    [Range(1, 100, ErrorMessage = "Quantity must be between 1 and 100.")]
    public int Quantity { get; set; }
}