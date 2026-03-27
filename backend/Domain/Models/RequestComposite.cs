using System.Collections.Generic;
using System.Linq;

namespace Syncflow.API.Domain.Models;

public abstract class RequestComponent
{
    public abstract int GetTotalRequests();
}

public class RequestItem : RequestComponent
{
    public SyncRequest Request { get; set; }

    public override int GetTotalRequests() => 1;
}

public class RequestGroup : RequestComponent
{
    public string Name { get; set; } = string.Empty;
    public List<RequestComponent> Children { get; set; } = new();

    public override int GetTotalRequests()
    {
        return Children.Sum(c => c.GetTotalRequests());
    }
}
