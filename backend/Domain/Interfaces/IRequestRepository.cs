using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Syncflow.API.Domain.Models;

namespace Syncflow.API.Domain.Interfaces;

public interface IRequestRepository
{
    Task<List<SyncRequest>> GetAllAsync();
    Task<SyncRequest?> GetByIdAsync(Guid id);
    Task AddRangeAsync(IEnumerable<SyncRequest> requests);
    void Remove(SyncRequest request);
    Task SaveChangesAsync();
}
