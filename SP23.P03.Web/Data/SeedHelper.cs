using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SP23.P03.Web.Features.Authorization;
using SP23.P03.Web.Features.Passengers;
using SP23.P03.Web.Features.TrainStations;

namespace SP23.P03.Web.Data;

public static class SeedHelper
{
    public static async Task MigrateAndSeed(IServiceProvider serviceProvider)
    {
        var dataContext = serviceProvider.GetRequiredService<DataContext>();

        await dataContext.Database.MigrateAsync();

        await AddRoles(serviceProvider);
        await AddUsers(serviceProvider);

        await AddTrainStation(dataContext);
        await AddPassengers(serviceProvider, dataContext);
    }

    private static async Task AddUsers(IServiceProvider serviceProvider)
    {
        const string defaultPassword = "Password123!";
        var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

        if (userManager.Users.Any())
        {
            return;
        }

        var adminUser = new User
        {
            UserName = "galkadi"
        };
        await userManager.CreateAsync(adminUser, defaultPassword);
        await userManager.AddToRoleAsync(adminUser, RoleNames.Admin);

        var bob = new User
        {
            UserName = "bob"
        };
        await userManager.CreateAsync(bob, defaultPassword);
        await userManager.AddToRoleAsync(bob, RoleNames.User);

        var sue = new User
        {
            UserName = "sue"
        };
        await userManager.CreateAsync(sue, defaultPassword);
        await userManager.AddToRoleAsync(sue, RoleNames.User);
    }

    private static async Task AddRoles(IServiceProvider serviceProvider)
    {
        var roleManager = serviceProvider.GetRequiredService<RoleManager<Role>>();
        if (roleManager.Roles.Any())
        {
            return;
        }
        await roleManager.CreateAsync(new Role
        {
            Name = RoleNames.Admin
        });

        await roleManager.CreateAsync(new Role
        {
            Name = RoleNames.User
        });
    }

    private static async Task AddTrainStation(DataContext dataContext)
    {
        var trainStations = dataContext.Set<TrainStation>();

        if (await trainStations.AnyAsync())
        {
            return;
        }

        for (int i = 0; i < 3; i++)
        {
            dataContext.Set<TrainStation>()
                .Add(new TrainStation
                {
                    Name = "Hammond",
                    Address = "1234 Place st"
                });
        }

        await dataContext.SaveChangesAsync();
    }

    private static async Task AddPassengers(IServiceProvider serviceProvider, DataContext dataContext)
    {
        var userManager = serviceProvider.GetRequiredService<UserManager<User>>();
        var passengers = dataContext.Set<Passenger>();

        if (await passengers.AnyAsync())
        {
            return;
        }

        var user1 = await userManager.FindByNameAsync("bob");
        var user2 = await userManager.FindByNameAsync("sue");

        if(user1 == null || user2 == null)
        {
            throw new NullReferenceException("Users required for seeding Passengers not found.");
        }

        var offset = TimeZoneInfo.Local.BaseUtcOffset;

        passengers.AddRange(
            new Passenger
            {
                Owner = user1,
                FirstName = "Bob",
                LastName = "Brown",
                Birthday = new DateTimeOffset(1980, 5, 8, 3, 39, 22, offset)
            },
            new Passenger
            {
                Owner = user1,
                FirstName = "Bob Jr.",
                LastName = "Brown",
                Birthday = new DateTimeOffset(2010, 2, 1, 7, 11, 9, offset)
            },
            new Passenger
            {
                Owner = user1,
                FirstName = "May",
                LastName = "Brown",
                Birthday = new DateTimeOffset(1982, 8, 2, 9, 2, 12, offset)
            },
            new Passenger
            {
                Owner = user2,
                FirstName = "Sue",
                LastName = "Thompson",
                Birthday = new DateTimeOffset(1980, 9, 4, 1, 37, 59, offset)
            },
            new Passenger
            {
                Owner = user2,
                FirstName = "Lisa",
                LastName = "Thompson",
                Birthday = new DateTimeOffset(2017, 12, 24, 14, 0, 33, offset)
            },
            new Passenger
            {
                Owner = user2,
                FirstName = "Timothy",
                LastName = "Thompson",
                Birthday = new DateTimeOffset(1981, 10, 15, 18, 1, 1, offset)
            },
            new Passenger
            {
                Owner = user2,
                FirstName = "Gary",
                LastName = "Thompson",
                Birthday = new DateTimeOffset(1950, 1, 2, 0, 44, 7, offset)
            }
        );

        await dataContext.SaveChangesAsync();
    }
}