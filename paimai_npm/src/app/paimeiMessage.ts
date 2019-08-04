import { Component } from '@angular/core';
import { $WebSocket } from 'angular2-websocket/angular2-websocket'
import {User} from './User'


@Component({
  selector: 'paimeiMessage',
  templateUrl: './paimeiMessage.html',
  styleUrls: ['./paimeiMessage.css']
})
export class paimeiMessage {
  public price:number;
  title = 'app-test';
  websocket: WebSocket = null;
  public username: string = 'guowei';
  public user :User = new User();
  
  
  constructor() {
    this.user.id=500;
    this.price = 300;

    if ('WebSocket' in window) {
      this.websocket = new WebSocket("ws://localhost:8080"  + "/testmaven/websocket");
      //this.websocket.send(JSON.stringify(this.user));
    } else {
      alert('当前浏览器 Not support websocket')
    }
    //连接发生错误的回调方法  
    this.websocket.onerror = function () {
      console.log("WebSocket连接发生错误");
    };

    //连接成功建立的回调方法  
    this.websocket.onopen = function () {
      console.log("WebSocket连接成功");
    }

    //接收到消息的回调方法  
    this.websocket.onmessage = function (event) {
      console.log("回调开始");
      let user2=JSON.parse(event.data);
      console.log(event.data);
      console.log(JSON.parse(event.data));
      redate(user2);
    }

    //连接关闭的回调方法  
    this.websocket.onclose = function () {
      console.log("WebSocket连接关闭");
    }

    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。  
    window.onbeforeunload = function () {
      closeWebSocket();
    }

    //关闭WebSocket连接  
    function closeWebSocket() {
      this.websocket.close();
    }

    function redate(user:any){
      console.log("start redate");
      console.log(user.id);
      this.price=999;
      console.log(this.price)
    }
}

  open_connection(){
    this.user.name=this.username;
    this.price=666;
    //console.log(JSON.stringify(this.user));
    //判断当前浏览器是否支持WebSocket  
  }

  sendMsg() {
    this.websocket.send(JSON.stringify(this.user));
  }

}