namespace SP23.P03.Web.Features.TrainStations;

public class TrainStationDto
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Address { get; set; } = string.Empty;

    public int? ManagerId { get; set; }
}