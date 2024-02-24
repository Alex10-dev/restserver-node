import { envs } from '../src/config/envs';
import {Server} from '../src/presentation/server';

jest.mock('../src/presentation/server');

describe('Should call server with argument and start', () => {

    test('should work', async() => {
        await import('../src/app');

        expect(Server).toHaveBeenCalledTimes(1);
        expect(Server).toHaveBeenCalledWith({
            PORT: envs.PORT,
            PUBLIC_PATH: envs.PUBLIC_PATH,
            routes: expect.any( Function ),
        });

        expect(Server.prototype.startServer).toHaveBeenCalledWith();
    });
})