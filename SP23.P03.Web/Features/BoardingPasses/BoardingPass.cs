using SP23.P03.Web.Features.Authorization;
using SP23.P03.Web.Features.Passengers;
using SP23.P03.Web.Features.Trips;
using System.Security.Cryptography;
using System.Text;

namespace SP23.P03.Web.Features.BoardingPasses;

public class BoardingPass
{
    public int Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public int OwnerId { get; set; }
    public User Owner { get; set; }
    public int TripId { get; set; }
    public Trip Trip { get; set; }
    public ICollection<Passenger> Passengers { get; set; } = new List<Passenger>();

    public static string HashCode(string unhashedCode)
    {
        byte[] unhashedCodeBytes = Encoding.UTF8.GetBytes(unhashedCode);
        byte[] hashedCodeBytes = SHA256.HashData(unhashedCodeBytes);
        return Convert.ToHexString(hashedCodeBytes);
    }
}
