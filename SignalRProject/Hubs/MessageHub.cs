using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRProject.Hubs
{
    public class MessageHub : Hub, IMessageHub
    {
        private readonly IHubContext<MessageHub> _hubContext;
        public MessageHub(IHubContext<MessageHub> hubContext)
        {
            _hubContext = hubContext;
        }
        public Task SendMessageToAll(object message)
        {
            return _hubContext.Clients.All.SendAsync("ReceiveMessage", message);
        }

        public Task SendMessageToUser(string connectionId, object message)
        {
            return _hubContext.Clients.Client(connectionId).SendAsync("ReceiveMessage", message);
        }

        public Task JoinGroup(string group)
        {
            return _hubContext.Groups.AddToGroupAsync(Context.ConnectionId, group);
        }

        public Task SendMessageToGroup(string group, object message)
        {
            return _hubContext.Clients.Group(group).SendAsync("ReceiveMessage", message);
        }

        public override async Task OnConnectedAsync()
        {
            await _hubContext.Clients.All.SendAsync("UserConnected", Context.ConnectionId);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await _hubContext.Clients.All.SendAsync("UserDisconnected", Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }

    }
}
