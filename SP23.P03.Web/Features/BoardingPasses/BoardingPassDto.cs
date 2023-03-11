namespace SP23.P03.Web.Features.BoardingPasses;

public class BoardingPassDto
{
    public int Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public int OwnerId { get; set; }
    public int TripId { get; set; }
    public ICollection<int> PassengerIds { get; set; } = new List<int>();
}
