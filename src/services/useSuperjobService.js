
import { useHttp } from "../hooks/http.hook";

const useSuperjobService = () => {

	const { request } = useHttp();
	const _apiBase = "https://startup-summer-2023-proxy.onrender.com/2.0/";

	const getVacancy = async () => {
		const res = await request(`${_apiBase}vacancies/`);
		return res.objects.map(_transformVacancy);
	};

	const getFilteredVacancies = async (paymentFrom, paymentTo, cataloguesKey, term) => {
		const res = await request(`${_apiBase}vacancies/?keyword=${term}&order_field=payment&order_direction=asc&payment_from=${paymentFrom}&payment_to=${paymentTo}&no_agreement=1&catalogues=${cataloguesKey}&published=1/`);
		return res.objects.map(_transformVacancy);
	};

	const getCatalogues = async () => {
		const res = await request(`${_apiBase}catalogues/`);
		return res.map(_transformCatalogues)
	}

	const _transformVacancy = (item) => {
		return {
			id: item.id,
			key: item.id,
			title: item.profession,
			paymentFrom: item.payment_from,
			currency: item.currency,
			paymentTo: item.payment_to,
			typeOfWork: item.type_of_work.title,
			city: item.town.title,
			isfavorite: false,
			cataloguesKey: item.catalogues[0].id,
			information: item.vacancyRichText
		};
	}

	const _transformCatalogues = (item) => {
		return {
			id: item.key,
			key: item.key,
			title: item.title
		};
	}

	return {
		getVacancy,
		getFilteredVacancies,
		getCatalogues
	};
};

export default useSuperjobService;
