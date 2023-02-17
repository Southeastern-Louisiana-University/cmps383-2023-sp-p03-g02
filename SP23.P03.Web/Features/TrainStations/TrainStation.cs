using SP23.P03.Web.Features.Authorization;

namespace SP23.P03.Web.Features.TrainStations;

public class TrainStation
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Address { get; set; } = string.Empty;

    public int? ManagerId { get; set; }
    public virtual User? Manager { get; set; }
}