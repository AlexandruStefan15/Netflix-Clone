import React, { useState, createContext, useContext, useEffect, useRef } from "react";
import { Children } from "react";
import styles from "./Accordion.module.scss";
import accordionData from "../../Data/faq-home";
import { inline_svgs } from "../../Assets/svgs/svgs";
import { useTranslation } from "react-i18next";

const AccordionContext = createContext();
const ItemContext = createContext();

export default function Accordion({ data = accordionData, className = "", children, ...props }) {
	const { t, i18n } = useTranslation();
	const [itemSelected, setItemSelected] = useState(null);

	let items = Children.map(children, (child, index) => {
		const clone = React.cloneElement(child, { index });
		return clone;
	});

	if (!children)
		items = data.map((item, index) => (
			<Accordion.Item key={item.id} index={index}>
				<Accordion.Label>
					<Accordion.Text>{t(item.label)}</Accordion.Text>
					<Accordion.Icon>{inline_svgs.cross}</Accordion.Icon>
				</Accordion.Label>
				<Accordion.Details>
					{Object.entries(item.details).map((paragraph) => (
						<Accordion.Text key={paragraph[0]}>{t(paragraph[1])}</Accordion.Text>
					))}
				</Accordion.Details>
			</Accordion.Item>
		));

	return (
		<AccordionContext.Provider value={{ itemSelected, setItemSelected }}>
			<ul className={styles.accordion + ` ${className}`} {...props}>
				{items}
			</ul>
		</AccordionContext.Provider>
	);
}

Accordion.Item = function Accordion_Item({ className = "", children, index, ...props }) {
	return (
		<ItemContext.Provider value={{ index }}>
			<li className={styles.item + ` ${className}`} {...props}>
				{children}
			</li>
		</ItemContext.Provider>
	);
};

Accordion.Label = function Accordion_Label({ className = "", children, ...props }) {
	const { itemSelected, setItemSelected } = useContext(AccordionContext);
	const { index } = useContext(ItemContext);

	function handleClick(e, i) {
		if (itemSelected == i) setItemSelected(null);
		else setItemSelected(i);
	}

	return (
		<div
			className={styles.label + ` ${className}`}
			onClick={(event) => handleClick(event, index)}
			{...props}
		>
			{children}
		</div>
	);
};

Accordion.Details = function Accordion_Details({ children, className = "", ...props }) {
	const { itemSelected } = useContext(AccordionContext);
	const { index } = useContext(ItemContext);
	const el = useRef(null);

	useEffect(() => {
		if (itemSelected == index) el.current.classList.add(styles.active);
		else el.current.classList.remove(styles.active);
	}, [itemSelected]);

	return (
		<div className={styles.details + ` ${className}`} ref={el} {...props}>
			{children}
		</div>
	);
};

Accordion.Text = function Accordion_Text({ className = "", children, ...props }) {
	return (
		<p className={styles.text + ` ${className}`} {...props}>
			{children}
		</p>
	);
};

Accordion.Icon = function Accordion_Item({ className = "", children, src, alt, ...props }) {
	if (src) return <img src={src} alt={alt} />;

	return (
		<span className={styles.icon + ` ${className}`} {...props}>
			{children}
		</span>
	);
};
