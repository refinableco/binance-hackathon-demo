// declaring module will allow typescript to import the module
declare module "react-jazzicon" {
    // typing module default export as `any` will allow you to access its members without compiler warning
    const jazzicon: any;
    export default jazzicon;
}

declare module "react-identicons" {
    // typing module default export as `any` will allow you to access its members without compiler warning
    import {FC} from "react";
    const Identicon: FC<{ size?: number, string: string, padding?: number }>;
    export default Identicon;
}
