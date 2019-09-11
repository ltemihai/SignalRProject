using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRProject.Hubs
{
    public interface IMessageHub
    {
        Task SendMessageToAll(object message);
        Task SendMessageToCaller(object message);
        Task SendMessageToUser(string connectionId, object message);
        Task JoinGroup(string group);
        Task SendMessageToGroup(string group, object message);
        Task OnConnectedAsync();
        Task OnDisconnectedAsync(Exception exception);

    }
}
