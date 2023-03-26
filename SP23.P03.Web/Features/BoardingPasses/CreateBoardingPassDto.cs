namespace SP23.P03.Web.Features.BoardingPasses;

public class CreateBoardingPassDto
{
    public string TravelClass { get; set; } = string.Empty;
    public ICollection<int> TripIds { get; set; } = new List<int>();
    public ICollection<int> PassengerIds { get; set; } = new List<int>();
}
