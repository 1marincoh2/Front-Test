import Api from "./api.service";


export class ClasificacionService {
	private http = Api

	public async getClasificacion() {
		return await this.http.get('classification').then(res => res.data)
	}


	}

	export const url = new ClasificacionService();