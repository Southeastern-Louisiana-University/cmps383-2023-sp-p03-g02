using Microsoft.AspNetCore.Identity;

namespace SP23.P03.Web.Features.Authorization;

public class Role : IdentityRole<int>
{
    public virtual ICollection<UserRole> Users { get; set; } = new List<UserRole>();
}