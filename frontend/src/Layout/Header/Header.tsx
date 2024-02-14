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
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
const Header = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <nav className="header__contents">
      <Flex
        className="nav__flex"
        align={{ base: "center", md: "center" }}
        justify={{ md: "space-between" }}
      >
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
          justify={{ md: "space-between" }}
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
          flex={{ base: 0.5, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={5}
        >
          <Button
            as={Link}
            fontSize={"sm"}
            fontWeight={400}
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
