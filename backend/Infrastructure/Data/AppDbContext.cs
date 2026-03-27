using Microsoft.EntityFrameworkCore;
using Syncflow.API.Domain.Models;

namespace Syncflow.API.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    
    public DbSet<SyncRequest> SyncRequests => Set<SyncRequest>();
}
