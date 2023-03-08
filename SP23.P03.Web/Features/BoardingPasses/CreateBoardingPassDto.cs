namespace SP23.P03.Web.Features.BoardingPasses;

public class CreateBoardingPassDto
{
    public int TripId { get; set; }
    public ICollection<int> PassengerIds { get; set; } = new List<int>();
}
