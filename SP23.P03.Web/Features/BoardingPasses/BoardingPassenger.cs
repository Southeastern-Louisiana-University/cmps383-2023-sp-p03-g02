using SP23.P03.Web.Features.Passengers;

namespace SP23.P03.Web.Features.BoardingPasses;

public class BoardingPassenger
{
    public int BoardingPassId { get; set; }
    public BoardingPass BoardingPass { get; set; }
    public int PassengerId { get; set; }
    public Passenger Passenger { get; set; }
}
