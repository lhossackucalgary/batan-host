import { Router, Request, Response } from 'express';
import { connectAndDo } from '../../database';

const route = Router();

export default (app: Router) => {
    app.use('/profile', route);

    route.get('/info', async function(req: Request, res: Response) {
        console.log("Got a profile-info request");
        connectAndDo(async (db : any) => {
            if(db === undefined || db === null){
                console.error("Cannot connect to the database through the get/info endpoint");
                res.send(null);
                return;
            }

            if(req.user === undefined || req.user.sub === undefined){
                console.error("Missing the users auth information");
                res.send(null);
                return;
            }

            let user_info = await db.UserModel.findBySub(req.user.sub);
            console.log(user_info);

            if(user_info !== null){
                res.send({
                    sub: user_info.sub,
                    email: user_info.email,
                    firstName: user_info.firstName,
                    lastName: user_info.lastName,
                    nickname: user_info.nickname,
                    games: user_info.games,
                });
            } else {
                res.send(null);
            }
        });
    });

    route.post('/create', function(req: Request, res: Response) {
        console.log("Got a create request");
        if(req.user === undefined || req.user.sub === undefined){
            console.error("Missing the users auth information");
            res.send(null);
            return;
        }

        if(req.body === undefined){
            console.error("Missing user information");
            res.send(null);
            return;
        }

        connectAndDo(async (db : any) => {
            if(db === undefined || db === null){
                console.error("Cannot connect to the database through the post/create endpoint");
                res.send(null);
                return;
            }
            const user = {
                sub: req.user.sub,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                nickname: req.body.nickname,
                games: []
            };

            const result = await db.UserModel.create(user);
            res.send(user);
        });
    });

    route.post('/delete-profile', function(req: Request, res: Response) {
        console.log("Got delete request");
        if(req.user === undefined){
            console.error("Missing the users auth information");
            res.send(null);
            return;
        }

        connectAndDo(async (db : any) => {
            if(db === undefined || db === null){
                console.error("Cannot connect to the database through the post/delete endpoint");
                res.send(null);
                return;
            }

            const user_info = await db.UserModel.deleteUser(req.user.sub);
            res.send(user_info);
        });
    });
}