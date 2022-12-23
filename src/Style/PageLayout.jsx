import { Link } from "react-router-dom";
import { StyledLayout } from "./StyledLayout";


export const PageLayout = ({ children, title, seeAllLink, breadcrumb}) => (


    <StyledLayout>
        <div className='inner_layout'>
            <div className='top_of_layout'>
                <h2 className = 'layout_heading'>
                    {breadcrumb && (
                        <span className = 'layout_breadcrumb'>
                            <Link to = '/profile'>Profile</Link>
                        </span>
                    )}


                    {title && (
                        <div>
                            {seeAllLink ? (
                                <Link to = {seeAllLink}>{title}</Link>
                            ) : (
                                <div>{title}</div>
                            )}
                        </div>
                    )}
                </h2>


                {seeAllLink && (
                    <Link to = {seeAllLink} 
                    className='layout_see_all'>See All</Link>
                )}
            </div>


            {children}
        </div>

    </StyledLayout>

);