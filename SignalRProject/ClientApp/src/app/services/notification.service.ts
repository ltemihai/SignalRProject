import { Injectable } from '@angular/core';

import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';

@Injectable()
export class NotificationService {

    private connection: HubConnection;

    constructor() {

    }

    public createNewConnection(): void {
        console.log('Create Connection');
        this.connection = new HubConnectionBuilder()
            .withUrl('/messages')
            .build();
    }

    public startConnection(): void {
        console.log('Start Connection');
        this.connection.start();
    }

    public stopConnection(): void {
        console.log('Stop Connection');
        this.connection.stop();
    }

    public subscribeToKey(key: string, methodOnReceive: any): void  {
        console.log('Subscribed to: ', key);
        this.connection.on(key, methodOnReceive);
    }

    public unsubscribeFromKey(key: string): void  {
        this.connection.off(key);
    }

    public sendMessageToAll(key: string, data: any): Promise<any> {
        return this.connection.invoke(key, data);
    }

    public sendMessageToCaller(key: string, data: any): Promise<any> {
        return this.connection.invoke(key, data);
    }

    public sendMessageToClient(key: string, connectionId: string, data: any): Promise<any> {
        return this.connection.invoke(key, connectionId, data);
    }

    public sendMessageToGroup(key: string, groupName: string, data: any): Promise<any> {
        return this.connection.invoke(key, groupName, data);
    }

    public joinGroup(key: string, groupName: string): Promise<any> {
        return this.connection.invoke(key, groupName);
    }
}
