using System;

namespace Syncflow.API.Domain.Models;

public record SyncRequest(Guid Id, string Name, string Payload, string Status, string Type, DateTime CreatedAt);
