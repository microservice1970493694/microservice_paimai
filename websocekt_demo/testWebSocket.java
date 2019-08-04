package mybatis.com.homejim.mybatis.entity;

import java.io.IOException;  
import java.util.Map;  
import java.util.concurrent.ConcurrentHashMap;  
import javax.websocket.*;  
import javax.websocket.server.PathParam;  
import javax.websocket.server.ServerEndpoint;  
import net.sf.json.JSONObject;  
  
@ServerEndpoint(value ="/websocket", decoders = { UserDecoder.class }, encoders = { UserEncoder.class })  
public class testWebSocket {
	public testWebSocket(){
		System.out.println("WebsocketTest..");
	}
  
	@OnOpen
    public void onopen(Session session){
        System.out.println("连接成功");
        try {
            session.getBasicRemote().sendText("hello client...");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
	
	 /**
     * 收到客户端消息后调用的方法
     * @param message 客户端发送过来的消息
     * @param session 可选的参数
     */
	@OnMessage
	public User onMessage(User user) {
                // 做点处理返回给客户端
		System.out.print(user.getName());
		System.out.print(user.getId());
		user.setId(1000);
		user.setName("yes, jack");
		return user;
	}
	
    @OnClose
    public void onclose(Session session){
        System.out.println("close....");
        
    }
    
    // @OnMessage      
    public void onsend(Session session,String msg){
        try {
            session.getBasicRemote().sendText("client"+session.getId()+"say:"+msg);
        } catch (IOException e) {
            e.printStackTrace();
        }
    } 
}  
