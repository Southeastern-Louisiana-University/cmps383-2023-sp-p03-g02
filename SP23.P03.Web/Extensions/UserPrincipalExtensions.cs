using Microsoft.AspNetCore.Identity;
using SP23.P03.Web.Features.Authorization;
using System.Security.Claims;

namespace SP23.P03.Web.Extensions;

public static class UserPrincipalExtensions
{
    public static int? GetCurrentUserId(this ClaimsPrincipal claimsPrincipal)
    {
        var userIdClaimValue = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userIdClaimValue == null)
        {
            return null;
        }
        return int.Parse(userIdClaimValue);
    }

    public static string? GetCurrentUserName(this ClaimsPrincipal claimsPrincipal)
    {
        // same as: claimsPrincipal.FindFirstValue(ClaimTypes.Name)
        return claimsPrincipal.Identity?.Name;
    }

    public static async Task<User?> GetCurrentUserAsync(this ClaimsPrincipal claimsPrincipal, UserManager<User> userManager)
    {
        return await userManager.GetUserAsync(claimsPrincipal);
    }
}
