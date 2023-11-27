import { ChatRoom } from 'src/schemas/chat-room.schema';
import { ChatRoomService } from './chat-room.service';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

class ChatRoomModel {
  constructor(private data) {}
  save = jest.fn().mockResolvedValue(Promise.resolve(this.data));
  static find = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue([
      {
        roomId: 'abcxyz',
        userId: 'abc',
        message: 'Hello',
        createdAt: Date.now(),
      },
    ]),
  });
}

describe('ChatRoom Test suite', () => {
  let service: ChatRoomService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ChatRoomService,
        {
          provide: getModelToken(ChatRoom.name),
          useValue: ChatRoomModel,
        },
      ],
    }).compile();

    service = module.get<ChatRoomService>(ChatRoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a message', async () => {
    expect(
      await service.create({
        roomId: 'abcxyz',
        userId: 'abc',
        message: 'hello',
      }),
    ).toEqual({ roomId: 'abcxyz', userId: 'abc', message: 'hello' });
  });
  it('should find all Message', async () => {
    expect(await service.findAllMessage('abcxyz')).toEqual([
      {
        roomId: 'abcxyz',
        userId: 'abc',
        message: 'Hello',
        createdAt: expect.any(Number),
      },
    ]);
  });
});
