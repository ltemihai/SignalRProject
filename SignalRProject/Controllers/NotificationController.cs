using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRProject.Hubs;

namespace SignalRProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : Controller
    {
        private readonly IMessageHub _messageHub;

        public NotificationController(IMessageHub messageHub)
        {
            _messageHub = messageHub;
        }

        [HttpPost("")]
        public async Task<IActionResult> InsertMessage([FromBody] string message)
        {
            await _messageHub.SendMessageToAll(message);
            return Ok();
        }
    }
}