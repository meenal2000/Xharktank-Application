# Xharktank Application

This is NodeJs web Application powered by Express. In this, the investors and entrepreneurs can come and submit their respective pitch ideas. They can also see all the pitches that have been submitted. The investors can also make an offer on any pitch. 




## Tech Stack

**Server:** Node, Express


## Running Tests

To run tests, run the following command

```bash
  
python3 -m pytest --pspec --disable-pytest-warnings assessment/main.py

```






## Project Status

The back-end of this Project is fully developed and contains all the validation checks.
The front-end is still under development.


## API Reference

#### Get all pitches

```http
  GET /pitches/
```

#### Get a single pitch

```http
  GET /pitches/pitchId
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `pitchid`      | `string` | **Required**. Id of pitch to fetch |

#### Post a pitch

```http
  POST /pitches/
```
#### Post an offer in a pitch

```http
  POST /pitches/:pitchId/makeOffer
```
