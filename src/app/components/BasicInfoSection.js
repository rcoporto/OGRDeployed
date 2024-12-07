import Image from "next/image";

const BasicInfoSection = () => {
    return (

        // Container div for entire component
        <div>
            <Image
                src="/wavelines2.png"
                alt="Wave Lines"
                height={400}
                width={1800}
                className='opacity-20 top-0 absolute z-0'
            />

            <div className="grid md:grid-cols-1 gap-4 mx-6 justify-self-center">
                <a href="https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases" target="_blank" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-screen-lg hover:bg-gray-100 z-10 bg-blend-screen backdrop-blur-lg transition-all duration-300 cursor-pointer filter hover:grayscale">
                    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/info1.jpg" alt="" />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-pink-30">National Eye Institute (NEI) - Eye Conditions Related to Genetics</h5>
                        <p className="mb-3 font-normal text-gray-60 font-lora">Explore the NEI’s Eye Conditions and Diseases page for reliable information on various eye health issues. This resource covers a wide range of topics, including symptoms, causes, prevention, and treatment options for both common and rare eye conditions, helping you stay informed about maintaining healthy vision.</p>
                    </div>
                </a>

                <a href="https://retina-international.org/irds/" target="_blank" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-screen-lg hover:bg-gray-100 z-10 bg-blend-screen backdrop-blur-lg transition-all duration-300 cursor-pointer filter hover:grayscale">
                    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/info2.jpg" alt="" />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-pink-30">Retina International - Inherited Retinal Diseases</h5>
                        <p className="mb-3 font-normal text-gray-60 font-lora">Learn more about Inherited Retinal Diseases (IRDs) through Retina International’s platform. This resource offers valuable insights into genetic retinal disorders like retinitis pigmentosa and Stargardt disease, while promoting advocacy, collaboration, and the latest research breakthroughs in the field of IRDs.</p>
                    </div>
                </a>

                <a href="https://oculargenomics.meei.harvard.edu/" target="_blank" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-screen-lg hover:bg-gray-100 z-10 bg-blend-screen backdrop-blur-lg transition-all duration-300 cursor-pointer filter hover:grayscale">
                    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/info3.jpg" alt="" />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-pink-30">The Ocular Genomics Institute (OGI)</h5>
                        <p className="mb-3 font-normal text-gray-60 font-lora">Discover the cutting-edge work of the Ocular Genomics Institute at Harvard. This resource focuses on the genetic basis of eye diseases, offering information on research advancements, personalized therapies, and genomic studies that aim to transform the future of eye care.</p>
                    </div>
                </a>
            </div>
            {/* End of container div */}
        </div>

    );
}

export default BasicInfoSection;