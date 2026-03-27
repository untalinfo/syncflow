using System;

namespace Syncflow.API.Application.Processors;

public class RequestProcessorFactory
{
    public static IRequestProcessor GetProcessor(string type)
    {
        return type?.ToLower() switch
        {
            "uppercase" => new UpperCaseProcessor(),
            "reverse" => new ReverseProcessor(),
            _ => throw new NotImplementedException($"Type {type} not supported")
        };
    }
}
