import { FastifyRequest, FastifyReply} from 'fastify';

export async function checkSessionsId(request: FastifyRequest, replay:FastifyReply){
    const sessions_id = request.cookies.sessionsId;

    if(!sessions_id){
        return replay.status(404).send({

            error: "Unouthorized"
        })
    };
};