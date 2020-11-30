/* eslint-disable */
import Promise from 'bluebird'
import axios from 'axios'
import puppeteer from 'puppeteer'


import { filterValidUrl } from './utils/validateAnchor'

const fetchAnchorsWithPageInfo = ({ url }) => new Promise((resolve, reject) => {
	
	return scapAnchorTags(url)
		.then(tags => {
			
			
			return Promise.map(tags, (linkObj) => {
				return getPageInfo(linkObj)
			}, {
				concurrency: 10
			})
		})
		.then(result => {
			let filteredResult = result.filter((element)=> element!=null)
			const response = {
				message: 'Success',
				data: filteredResult
			}
			resolve(response)
		})
		.catch(error => {
			reject(error)
		})
})

const scapAnchorTags = async url => {

	const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
	const page = await browser.newPage()

	await page.goto(url,{waitUntil: 'load', timeout: 0})

	const links = await page.evaluate(() => Array.from(document.querySelectorAll('a')).map(anchor => ({
		link: anchor.href,
		text: anchor.textContent
	})))

	await browser.close()

	const filteredUrls = filterValidUrl(links, url)
	return filteredUrls

}

const getPageInfo = (urlObj) => {

		
	return axios.get(urlObj.link)
	.then((response) => {

		let header = response.headers
		let contentEncoding = header['content-encoding'] || header['transfer-encoding'] || "NA"
		let serverInfo = header.server || 'unknown'
		let contentLenght = header['content-length'] || 0
		let obj = {
			...urlObj,
			contentEncoding,
			serverInfo,
			contentLenght
		}
		
		return obj
	})
	.catch((error) => { return null })

}

export {
	fetchAnchorsWithPageInfo
}
