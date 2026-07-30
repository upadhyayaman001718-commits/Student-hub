interface ResourceStatsProps {
    downloads: number;
    pages: number;
    rating: number;
}

export default function ResourceStats({
    downloads,
    pages,
    rating,
}: ResourceStatsProps) {
    return (
        <section className="mt-8">

            <h2 className="text-lg font-semibold mb-4">
                Resource Statistics
            </h2>

            <div className="grid grid-cols-3 gap-4">

                <div className="rounded-xl border border-white/10 bg-[#0F0F11] p-4">

                    <p className="text-xs text-zinc-500">
                        Downloads
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                        {downloads}
                    </h3>

                </div>

                <div className="rounded-xl border border-white/10 bg-[#0F0F11] p-4">

                    <p className="text-xs text-zinc-500">
                        Pages
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                        {pages}
                    </h3>

                </div>

                <div className="rounded-xl border border-white/10 bg-[#0F0F11] p-4">

                    <p className="text-xs text-zinc-500">
                        Rating
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                        ⭐ {rating}
                    </h3>

                </div>

            </div>

        </section>
    );
}