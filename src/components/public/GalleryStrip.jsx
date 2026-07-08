import Reveal from "../common/Reveal";

const IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDykdeuPH_B_1akwjNv_oU6vMP8rBd_EWMvm6Nmm97gNb7Tev9loHQS116KrVsmxojOaJHfJIBxTPmPrtY-kUe6ReYZStSniJitCrUeznRwE8QIx7yzcnqb1pEtK6bojr3Kh6GTJTMs5f8vMVraNNodTHVhW5Wo4oW4Nmn3rk2pU6tzrYbf2X_bE6L7IfHK3vOMLNLMxrYk_k86ZmAXFfUe29AuLJQQ48yvp0Pc5c1PKGqBYMFCaCy0",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAxA4kmqegrCgO3uJCR4yQIsJwFKBNR4ruLGxE5LI8b5DEeHbEYM8djABbbHa5lVyvGPRBeiGMNPkOt7zp_f_wvgeQp2-bsmOIdHOzYmgl558bR4cFRNKmnXL__VDsNzcgWdqAqqBpSJJUG64h1UGukrbg2qU-IYOFA9INxTjheIGIZYEnV5EQ47JIIwov_YpTKK5w2XNG3AzLuQl4Jogy3EIOTIS9I0PpDZ3oc6INNHOiC7bXqAicK",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCbrhQnQTvL-hj1cW2I01h4MFFdwI-aXLk8wPNAp1fJMvZVxfnndsEHH35G05vJJoOA_rROAiFlynjSeQw5_t2I4humsEo_1YXGQoxv7-1jnvVwZzTXhJr1HCDcPTv61oqM97rY5hy2w4fmBKZtTWKp7RrVL2KaZhTRWjieW-Y8j5dCrBD_FWrETZXxsyAMaX4mLzGw3_lZWNnSpCPqELSHQqXn0XCsgBvHxN3phibN9rCEqVRAjOnL",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCMySdE8LmKvujmL1mh_AKarya9oa6PsaIZEEW51neQnYsUv8kWrOQOHxgeqrJ3ytoLfiZY9BNwpiePhdV3AKaUzUswg1Hsk7Cd71_MUl-SqaEWIGCouzbYHFaQ1vY2zbZDfAsgjdFh2QOqUhmqVQ6TfNfQmNed56Rz2heI5Wi9MZTQQ_FQwQU4Wri9y7mxH5TnBfWoJ94PNwkWagFcLJv1TWK8fvPzrbAa3n1W4MNXwkHtrrPShjjQ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCW20Y2YbhRht2AEQqghtS0uPAOXlVUSj5GUiaMaWM5YPit5drIkndnb5Og4CuWyQBYZAFMku0_GWNDbkc1Td0ExUU_0x8WYHk1NhLB9xCnltk0Vf-WkxNspoI95qYIopLahPKtlXG_tr_9CgJ_DL9PrqrB8ON-D0tNXUN6MkzjIEQjjYY1SgqPVkXuESsRmNLB002hUs0yBz5H4KMHy02EPgEhQjnW0Q3rQW85_9SLWKeyrQ-dm5Fj",
];

export default function GalleryStrip() {
  return (
    <section className="overflow-hidden bg-surface-container-low py-16 md:py-24">
      <Reveal className="mx-auto mb-10 flex max-w-[1200px] items-end justify-between px-6">
        <div>
          <h2 className="text-3xl font-extrabold text-on-background">Moments of Joy</h2>
          <p className="text-base font-medium text-on-surface-variant">
            A glimpse into our vibrant daily school life.
          </p>
        </div>
        <button className="hidden items-center gap-2 font-bold text-primary transition-all hover:gap-3 md:flex">
          View Full Gallery <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </Reveal>

      <div className="gallery-mask hide-scrollbar flex snap-x gap-6 overflow-x-auto px-6">
        {IMAGES.map((src, i) => (
          <div
            key={i}
            className="group h-96 w-80 flex-shrink-0 snap-center overflow-hidden rounded-3xl border-4 border-white shadow-lg transition-transform duration-300 hover:z-10 hover:-translate-y-2"
          >
            <img
              src={src}
              alt="Play Place children enjoying activities"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
