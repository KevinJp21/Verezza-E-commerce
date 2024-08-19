import Layout from "~/layouts/layout";
import StartHome from "~/sections/Home/SectionsHome/StartHome";
import WearHome from "~/sections/Home/SectionWear/WearHome";
import LatestProducts from "~/sections/Home/SectionLatestProducts/LatestProducts";

export default function Home() {
    return (
        <Layout>
            <StartHome />
            <WearHome />
            <LatestProducts />
        </Layout>
    );
}