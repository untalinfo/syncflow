using System.Linq;

namespace Syncflow.API.Application.Processors;

public class UpperCaseProcessor : IRequestProcessor
{
    public string Process(string payload)
    {
        return payload?.ToUpper() ?? string.Empty;
    }
}

public class ReverseProcessor : IRequestProcessor
{
    public string Process(string payload)
    {
        if (string.IsNullOrEmpty(payload)) return string.Empty;
        return new string(payload.Reverse().ToArray());
    }
}
