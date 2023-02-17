using Microsoft.AspNetCore.Identity;

namespace SP23.P03.Web.Features.Authorization;

public class UserRole : IdentityUserRole<int>
{
    public virtual Role? Role { get; set; }
    public virtual User? User { get; set; }
}
