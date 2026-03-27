using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Syncflow.API.Domain.Interfaces;
using Syncflow.API.Domain.Models;
using Syncflow.API.Infrastructure.Data;

namespace Syncflow.API.Infrastructure.Repositories;

public class RequestRepository : IRequestRepository
{
    private readonly AppDbContext _context;

    public RequestRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<SyncRequest>> GetAllAsync()
    {
        return await _context.SyncRequests.ToListAsync();
    }

    public async Task<SyncRequest?> GetByIdAsync(Guid id)
    {
        return await _context.SyncRequests.FindAsync(id);
    }

    public async Task AddRangeAsync(IEnumerable<SyncRequest> requests)
    {
        await _context.SyncRequests.AddRangeAsync(requests);
    }

    public void Remove(SyncRequest request)
    {
        _context.SyncRequests.Remove(request);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
