import React, { useState } from "react";
import { ENV } from "../config/env";
import { PixabayService } from "../services/pixabay.service";

export const useImageFetch = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, sethHasMore] = useState(true);

    const fetchImages = async (searchQuery, pageNum = 1, append = false) => {
        if (append) {
            setLoadingMore(true);
            await new Promise((resolve) =>
                // setTimeout(() => resolve, ENV.LOAD_MORE_DELAY)
                setTimeout(resolve, ENV.LOAD_MORE_DELAY)
            );
        } else {
            setLoading(true);
        }
        setError(null);

        try {
            const perPage = append ? ENV.PER_PAGE_LOAD_MORE : ENV.PER_PAGE_INITIAL;

            const data = await PixabayService.fetchImages(
                searchQuery,
                pageNum,
                perPage
            );

            if (data.hits && data.hits.length > 0) {
                if (append) {
                    setImages((prev) => [...prev, ...data.hits]);
                } else {
                    setImages(data.hits);
                }
                sethHasMore(data.hits.length === perPage);
            } else {
                setError("No Images found");
                sethHasMore(false);
            }
        } catch (err) {
            setError(err.message);
            sethHasMore(false);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const resetImages = () => {
        setImages([]);
        sethHasMore(true);
    };

    return {
        images,
        loading,
        loadingMore,
        error,
        hasMore,
        fetchImages,
        resetImages,
    };
};