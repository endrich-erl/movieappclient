import Banner from '../components/Banner';

export default function Home() {

    const data = {
        title: "Movie Catalog",
        content: "Movies for everyone",
        destination: "/movies",
        buttonLabel: "Browse Movies"
    }

    return (
        <>
            <Banner data={data}/>
        </>
    )
}