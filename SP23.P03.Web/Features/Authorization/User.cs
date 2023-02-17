using Microsoft.AspNetCore.Identity;
using SP23.P03.Web.Features.TrainStations;

namespace SP23.P03.Web.Features.Authorization;

public class User : IdentityUser<int>
{
    public virtual ICollection<UserRole> Roles { get; set; } = new List<UserRole>();

    public virtual ICollection<TrainStation> ManageStations { get; set; } = new List<TrainStation>();
}