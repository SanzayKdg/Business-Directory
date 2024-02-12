import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Flex,
  IconButton,
  Popover,
  PopoverTrigger,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
const Header = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <nav className="header__contents">
      <Flex className="nav__flex" align={{ base: "center", md: "center" }}>
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          className="nav__start"
          flex={{ base: 1 }}
          justify={{ md: "start" }}
        >
          <Avatar src="/logo/logo512.svg" size="lg" className="" name="Logo" />
          <Flex
            className="nav__mid"
            ml={10}
            align={{ base: "center", md: "center" }}
          >
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            as={Link}
            fontSize={"sm"}
            fontWeight={400}
            // variant={"link"}
            to={"/"}
            colorScheme="whiteAlpha"
            className="header__cta__btns"
          >
            Sign In
          </Button>
          <Button
            as={Link}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            colorScheme="red"
            className="header__cta__btns"
          >
            Add Listing +
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </nav>
    // <nav className="header__contents">
    //   <div className="header__left">
    //     <Avatar src="/logo/logo512.svg" size="lg" className="" name="Logo" />
    //   </div>
    //   <div className="header__mid">
    //     <NavLink to="/" className="nav__link">
    //       Home
    //     </NavLink>
    //     <NavLink to="/listings" className="nav__link">
    //       Listings
    //     </NavLink>
    //     <NavLink to="/about" className="nav__link">
    //       About Us
    //     </NavLink>
    //     <NavLink to="/blogs" className="nav__link">
    //       Blogs
    //     </NavLink>
    //     <NavLink to="/contact" className="nav__link">
    //       Contact Us
    //     </NavLink>
    //   </div>
    //   <div className="header__right">
    //     <Button colorScheme="red" className="header__cta__btns">
    //       <Link className="add_listing__link" to={"/"}>
    //         Add Listing +
    //       </Link>
    //     </Button>
    //     {/* <Button style={{marginLeft: "1rem"}} className="header__cta__btns" colorScheme="whiteAlpha">
    //         <Link to={"/"}>Sign In</Link>
    //       </Button> */}
    //   </div>
    // </nav>
  );
};

export default Header;

const DesktopNav = () => {
  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <NavLink className="nav__link" to={`${navItem.href}`}>
                {navItem.label}
              </NavLink>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, href }: NavItem) => {
  const { onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
      </Box>
    </Stack>
  );
};

interface NavItem {
  label: string;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Listings",
    href: "/listings",
  },
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Blogs",
    href: "/blogs",
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
];
