import React from "react";
import { HeadFC, PageProps } from "gatsby";

const NotFoundPage: React.FC<PageProps> = () => {
  return <div><img src="https://http.cat/404" /></div>;
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>