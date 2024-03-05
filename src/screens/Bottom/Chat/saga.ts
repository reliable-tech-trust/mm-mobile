import createSocket from '@services/socket';
import store from '@store';
import * as actions from '@store/actions';
import {guard} from '@store/general/saga';
import {ActionPayload} from '@store/general/types';
import {ITEM_LIMIT_PER_PAGE} from '@utils/constants';
import {call, put, select, takeLeading} from 'redux-saga/effects';
import {Socket} from 'socket.io-client';
import {IMessage} from './types';

function* connectSocket() {
  const {accessToken} = yield select(state => state.auth);
  const socketInstance: Socket = yield call(() => createSocket(accessToken));

  if (socketInstance) {
    yield put({type: actions.SOCKET_INSTANCE, payload: {instance: socketInstance}});

    /**
     * Server received message from user
     */
    socketInstance.on('SERVER_RECEIVED_USER', () => {
      // console.log('SERVER_RECEIVED_USER', e);
    });

    /**
     * Bot Typing
     */
    socketInstance.on('BOT_TYPING', response => {
      store.dispatch({type: actions.TYPING_LISTENING, payload: {data: response.data.typing}});
    });

    /**
     * Message response from bot
     */
    socketInstance.on('MESSAGE_BOT', response => {
      store.dispatch({
        type: actions.NEW_MESSAGES_COMING,
        payload: {
          msg: [
            Object.assign(
              {},
              {
                _id: Math.random().toString(),
                text: response.data.message,
                createdAt: new Date(new Date()).toISOString(),
                user: {_id: '#BOT', avatar: '', name: 'Sam'},
              },
            ),
          ],
        },
      });
    });

    /**
     * Get list message paging response
     */
    socketInstance.on('USER_GET_MESSAGES_PAGING_RESPONSE', response => {
      store.dispatch({
        type: actions._onSuccess(actions.GET_MESSAGES),
        payload: {
          data: response.data.messages.reverse().map((item: IMessage) =>
            Object.assign(
              {},
              {
                _id: item._id,
                text: item.content,
                createdAt: item.createdAt,
                user: {
                  _id: item.senderId,
                  avatar: item.senderAvatar,
                  name: item.senderName,
                },
              },
            ),
          ),
        },
      });
    });
  }
}

function* getMessages(action: ActionPayload<{page: string}>) {
  const {page} = action.payload;
  const socket: Socket = yield select(state => state.socket.instance);
  yield socket.emit('USER_GET_MESSAGES_PAGING', {limit: ITEM_LIMIT_PER_PAGE, page});
}

function* sendMessage(action: ActionPayload<{message: string; channel: string}>) {
  const {message, channel} = action.payload;
  const socket: Socket = yield select(state => state.socket.instance);
  yield socket.emit('MESSAGE_USER', {message, channel});
  yield put({type: actions.GET_MESSAGES, payload: {page: 1}});
}

export default [
  takeLeading(actions.SOCKET_CONNECT, guard(connectSocket)),
  takeLeading(actions.GET_MESSAGES, guard(getMessages)),
  takeLeading(actions.SEND_MESSAGE, guard(sendMessage)),
];
