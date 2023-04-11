const MenuButton = ({icon: Icon,label}) => {
    return (
        <button className="flex items-center space-x-2 hover:text-white w-full">
            <Icon className="h-5 w-5" />
            <p>{label}</p>
        </button>
    );
};

export default MenuButton;
