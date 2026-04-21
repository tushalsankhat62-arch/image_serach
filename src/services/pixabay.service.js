import { ENV } from "../config/env";

export class PixabayService {
    static async fetchImages(
        searchQuery,
        pageNum = 1,
        perPage = ENV.PER_PAGE_INITIAL
    ) {
        // https://pixabay.com/api/?key=54991517-5a340615aecf4601f1bc5816d&q=yellow+flowers&image_type=photo

        const url = `${ENV.PIXABAY_BASE_URL}?key=${ENV.PIXABAY_API_KEY}&q=${encodeURIComponent(searchQuery)}
        &image_type=photo&per_page=${perPage}&page=${pageNum}&safesearch=true&pretty=true`

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch images");
        }

        return await response.json();
    }
}


