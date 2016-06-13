#node_checkers

Nodejs gameserver provisioning for checkers game.  Each game gets its own microserver.

Potential applications:

* AI Testing
* Live game hosting via JSON

May develop authentication check to prevent tampering with other's pieces.  Likely a session key or some other secret. Otherwise, all game rules enforced by the server.

To test current version, replace ip with your ip or 127.0.0.1.  To test on 127.0.0.1 using the built-in client, use http://127.0.0.1:8124/?html=true