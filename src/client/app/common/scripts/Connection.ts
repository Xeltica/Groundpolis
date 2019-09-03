import autobind from 'autobind-decorator';
import { EventEmitter } from 'eventemitter3';
import Stream from './stream';
export abstract class Connection extends EventEmitter {
	public channel: string;
	protected stream: Stream;
	public abstract id: string;
	constructor(stream: Stream, channel: string) {
		super();
		this.stream = stream;
		this.channel = channel;
	}
	@autobind
	public send(id: string, typeOrPayload, payload?) {
		const type = payload === undefined ? typeOrPayload.type : typeOrPayload;
		const body = payload === undefined ? typeOrPayload.body : payload;
		this.stream.send('ch', {
			id: id,
			type: type,
			body: body
		});
	}
	public abstract dispose(): void;
}
