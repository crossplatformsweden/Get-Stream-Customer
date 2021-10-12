import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Window,
  Channel,
  Chat,
  MessageInput,
  MessageList,
  useChannelStateContext,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";

import "stream-chat-css/dist/css/index.css";
//http://localhost:3000/?firstName=Sara&lastName=Taqesh&email=saratakkash@gmailcom&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoic2FyYXRha2thc2hAZ21haWxjb20ifQ.myo5FaUSuaLE_NZAmxGkBrnsMX4eUD8SJ2dI12uExRo&agentChannel=ahmad_crossplatform_se3
//http://localhost:3001/?firstName=Ahmad&lastName=Madi&email=ahmadmadi@gmailcom&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWhtYWRtYWRpQGdtYWlsY29tIn0.8AF4s5Xa3R8aHwJ1xgH0U6CEdN6BScZGY1Xdq9VlP0E&agentChannel=ahmad_crossplatform_se3
//http://localhost:3002/?firstName=Karim&lastName=Madi&email=saratakkash@gmailcom&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoic2FyYXRha2thc2hAZ21haWxjb20ifQ.myo5FaUSuaLE_NZAmxGkBrnsMX4eUD8SJ2dI12uExRo&agentChannel=ahmad_crossplatform_se3
const App = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const apiKey = process.env.REACT_APP_STREAM_KEY || "";
  const firstName = urlParams.get("firstName") || "";
  const lastName = urlParams.get("lastName") || "";
  const email = urlParams.get("email") || "";
  const token = urlParams.get("token") || "";
  const agentChannel = urlParams.get("agentChannel") || "";

  const [client, setClient] = useState<StreamChat>();
  const [customerChannel, setCustomerChannel] = useState<any>();

  useEffect(() => {
    const init = async () => {
      console.log(email);
      console.log(token);
      const client = StreamChat.getInstance(apiKey);

      await client.connectUser(
        { id: email, name: `${firstName}  ${lastName}`, email: email },
        token
      );
      setClient(client);

      const channel = client!.channel("messaging", agentChannel, {
        issue: "Customer Issue ####",
        image: logo,
        subtitle: "#853 CUstomer Inquiry",
        // option to add custom fields
      });
      console.log(channel);
      channel.watch();
      setCustomerChannel(channel);
    };
    init();
  }, [agentChannel, apiKey, email, firstName, lastName, token]);
  return (
    <div>
      {client && (
        <Chat client={client!}>
          <Channel channel={customerChannel!}>
            <Window>
              <CustomChannelHeader client={client} />
              <MessageList />
              <MessageInput focus />
            </Window>
          </Channel>
        </Chat>
      )}
    </div>
  );
};

interface ICustomerChannelHeader {
  client: StreamChat;
}
const CustomChannelHeader = (props: ICustomerChannelHeader) => {
  const { watcherCount } = useChannelStateContext();

  useEffect(() => {
    console.log(watcherCount);
  }, [watcherCount]);
  return (
    <div className="channel-header__container">
      <div className="channel-header__heading">
        <div className="channel-header__active" />
        <div className="channel-header__text">
          <p className="channel-header__name">
            Hello
            <span role="img" aria-label="waving-hand">
              👋
            </span>
          </p>
          <p className="channel-header__subtitle">We are here to help.</p>
        </div>
      </div>
      <div className="channel-header__wait__wrapper">
        <p className="channel-header__wait__text">
          Average wait time: <b>2 minutes</b>
        </p>
      </div>
    </div>
  );
};

export default App;
